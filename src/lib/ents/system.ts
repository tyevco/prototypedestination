import Component from "./component";
import Entity from "./entity";

export default class System {
    components: Array<Component> = [];

    before() { };
    act(e: Entity) { };
    after() { };

    step(entities: Array<Entity>) {
        var length = entities.length;
        for (var i = length - 1; i >= 0; i--) {
            var entity = entities[i];
            var systemArgs: Array<any> = [entity];
            if (this.components.every(function (c) {
                if (entity.hasComponent(c)) {
                    systemArgs.push(entity.getComponent(c.Name));
                    return true;
                }
                return false;
            })) {
                this.act.apply(this, systemArgs);
            }
        }
    }
}