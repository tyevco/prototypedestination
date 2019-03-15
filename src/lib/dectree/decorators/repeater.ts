import { Decorator } from "../decorator";
import { Status } from "../status";
import { BehaviorContext } from "../behaviorcontext";

//@sealed
export class Repeater extends Decorator {
    protected OnProcess(context: BehaviorContext): Status {
        let ret: Status = this.Child.Process(context);

        if (ret != Status.Running) {
            this.Reset();
            this.Child.Reset();
        }

        return Status.Success;
    }
}
