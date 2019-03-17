import { System, usesComponents } from "../../orion/ents/system";
import { Physics, RigidBody } from "../components";
import { Entity } from "../../orion/ents";


@usesComponents(Physics.Name, RigidBody.Name)
export class PhysicsEngine extends System {

    act(entity: Entity, physics: Physics, rigidBody: RigidBody): void {
        // console.log("physics act");
    }
}