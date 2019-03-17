
import { sealed } from "../../lang";
import { BehaviorContext } from "../behaviorcontext";
import { Decorator } from "../decorator";
import { Status } from "../status";

@sealed
export class Succeeder extends Decorator {
    protected OnProcess(context: BehaviorContext): Status {
        const ret: Status = this.Child.Process(context);

        if (ret === Status.Running) {
            return Status.Running;
        }

        return Status.Success;
    }
}
