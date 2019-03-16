import { System, usesComponents } from "../../lib/ents/system";
import { Physics, RigidBody } from "../components";


@usesComponents(Physics.Name, RigidBody.Name)
export class PhysicsEngine extends System { }