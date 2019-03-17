import { sealed } from "../../lang";
import { BehaviorContext } from "../behaviorcontext";
import { Composite } from "../composite";
import { Status } from "../status";

@sealed
export class Sequence extends Composite {
    private currentNode: number = 0;

    protected OnProcess(context: BehaviorContext): Status {
        const ret: Status = this.Nodes[this.currentNode].Process(context);

        if (ret === Status.Failure) {
            return Status.Failure;
        } else if (ret === Status.Success) {
            this.currentNode++;
            if (this.currentNode >= this.Nodes.length) {
                return Status.Success;
            } else {
                return this.OnProcess(context);
            }
        }

        return Status.Running;
    }

    protected OnReset(): void {
        this.currentNode = 0;
        for (const node of this.Nodes) {
            node.Reset();
        }
    }
}
