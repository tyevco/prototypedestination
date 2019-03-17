import { Decorator } from "../decorator";
import { Status } from "../status";
import { BehaviorContext } from "../behaviorcontext";

//@sealed
export class Inverter extends Decorator {
    protected OnProcess(context: BehaviorContext): Status {
        let ret: Status = this.Child.Process(context);

        if (ret == Status.Success) {
            return Status.Failure;
        }
        else if (ret == Status.Failure) {
            return Status.Success;
        }

        return Status.Running;
    }

}
