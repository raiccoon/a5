import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError } from "./errors";

export interface VisibilityDoc extends BaseDoc {
  resource: ObjectId;
  isPublic: boolean;
  author: ObjectId;
}

export interface VisibleToDoc extends BaseDoc {
  resource: ObjectId;
  viewerCollection: ObjectId;
}

export default class VisibilityConcept {
  public readonly visibility = new DocCollection<VisibilityDoc>("visibility");
  public readonly visibleTo = new DocCollection<VisibleToDoc>("visible_to");

  async setVisibility(resource: ObjectId, author: ObjectId, isPublic: boolean, viewerCollections?: ObjectId[]) {
    await this.visibility.createOne({ resource, isPublic, author });
    await this.canCreate(isPublic, viewerCollections);

    if (!isPublic) {
      await this.visibleTo.createMany(
        viewerCollections!.map((viewerCollection) => {
          return { resource, viewerCollection };
        }),
      );
    }

    return { msg: "Set visibility!", resource: resource };
  }

  async viewByDefault(viewer: ObjectId, resource: ObjectId) {
    const visibility = await this.visibility.readOne({ resource });
    return visibility!.isPublic || visibility!.author.toString() === viewer.toString();
  }

  async getVisibleTo(resource: ObjectId) {
    await this.isPrivate(resource);
    return (await this.visibleTo.readMany({ resource })).map((doc) => doc.viewerCollection);
  }

  // HELPERS
  private async canCreate(isPublic: boolean, viewerCollections?: ObjectId[]) {
    const noViewers = viewerCollections == null || viewerCollections.length == 0;
    if (isPublic && !noViewers) {
      throw new NotAllowedError(`Cannot set viewers if resource is public`);
    } else if (!isPublic && noViewers) {
      throw new NotAllowedError(`Must select viewers to share resource with`);
    }
  }
  private async isPrivate(resource: ObjectId) {
    const visibility = await this.visibility.readOne({ resource });
    if (visibility!.isPublic) {
      throw new NotAllowedError("Cannot get limited viewers of public resource");
    }
  }
}
