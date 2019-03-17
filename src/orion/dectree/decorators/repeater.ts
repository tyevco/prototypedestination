
import { sealed } from "../../lang";
import { BehaviorContext } from "../behaviorcontext";
import { Decorator } from "../decorator";
import { Status } from "../status";

@sealed
export class Repeater extends Decorator {
    protected OnProcess(context: BehaviorContext): Status {
        const ret: Status = this.Child.Process(context);

        if (ret !== Status.Running) {
            this.Reset();
            this.Child.Reset();
        }

        return Status.Success;
    }
}
