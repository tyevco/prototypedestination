import { Entity, System, usesComponents } from "../../orion/ents";
import { Physics, RigidBody } from "../components";

@usesComponents(Physics.Name, RigidBody.Name)
export class PhysicsEngine extends System {

    public act(entity: Entity, physics: Physics, rigidBody: RigidBody): void {
        // console.log("physics act");
    }
}
