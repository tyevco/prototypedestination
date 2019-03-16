import { System, usesComponents } from "../../lib/ents/system";
import { Physics, RigidBody } from "../components";
import { Entity } from "../../lib/ents";


@usesComponents(Physics.Name, RigidBody.Name)
export class PhysicsEngine extends System {

    act(entity: Entity, physics: Physics, rigidBody: RigidBody) {

    }
}