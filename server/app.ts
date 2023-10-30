import CollectionConcept from "./concepts/collection";
import FriendConcept from "./concepts/friend";
import PostConcept from "./concepts/post";
import ProfileConcept from "./concepts/profile";
import UserConcept from "./concepts/user";
import VisibilityConcept from "./concepts/visibility";
import WebSessionConcept from "./concepts/websession";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Post = new PostConcept();
export const Friend = new FriendConcept();
export const CollectionPost = new CollectionConcept("collections_of_posts", "labelled_posts");
export const CollectionUser = new CollectionConcept("collections_of_users", "labelled_users");
export const Visibility = new VisibilityConcept();
export const Profile = new ProfileConcept();
