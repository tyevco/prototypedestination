
import { sealed } from "../../lang";
import { BehaviorContext } from "../behaviorcontext";
import { Composite } from "../composite";
import { Status } from "../status";

@sealed
export class Selector extends Composite {
    private currentNode: number = 0;

    protected OnProcess(context: BehaviorContext): Status {
        if (this.currentNode >= this.Nodes.length) {
            return Status.Failure;
        }

        const ret: Status = this.Nodes[this.currentNode].Process(context);

        if (ret === Status.Failure) {
            this.currentNode++;
            return this.OnProcess(context);
        } else if (ret === Status.Success) {
            return Status.Success;
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
