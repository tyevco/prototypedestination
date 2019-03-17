
import { sealed } from "../../lang";
import { BehaviorContext } from "../behaviorcontext";
import { Decorator } from "../decorator";
import { Status } from "../status";

@sealed
export class Inverter extends Decorator {
    protected OnProcess(context: BehaviorContext): Status {
        const ret: Status = this.Child.Process(context);

        if (ret === Status.Success) {
            return Status.Failure;
        } else if (ret === Status.Failure) {
            return Status.Success;
        }

        return Status.Running;
    }
}
