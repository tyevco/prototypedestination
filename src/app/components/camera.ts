import { component, Entity } from "../../orion/ents";

@component
export class Camera {
    public Draggable: boolean;
    public Following: Entity;
}