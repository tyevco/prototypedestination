import { Entity, System, usesComponents } from "../../orion/ents";
import { RigidBody } from "../components";

@usesComponents(RigidBody)
export class PhysicsEngine extends System {

    public act(entity: Entity, rigidBody: RigidBody): void {
        // console.log("physics act");
    }
}
