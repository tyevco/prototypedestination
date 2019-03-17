import { Decorator } from "../decorator";
import { Status } from "../status";
import { BehaviorContext } from "../behaviorcontext";

//@sealed
export class Succeeder extends Decorator {
    protected OnProcess(context: BehaviorContext): Status {
        let ret: Status = this.Child.Process(context);

        if (ret == Status.Running)
            return Status.Running;

        return Status.Success;
    }
}
