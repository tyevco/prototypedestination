import { component, Entity } from "../../orion/ents";

@component
export class Camera {
    public Scrollable: boolean;
    public Following: Entity;
}