import { Composite } from "../composite";
import { BehaviorContext } from "../behaviorcontext";
import { Status } from "../status";

//@sealed
export class Selector extends Composite {
    private currentNode: number = 0;

    protected OnProcess(context: BehaviorContext): Status {
        if (this.currentNode >= this.Nodes.length) {
            return Status.Failure;
        }

        let ret: Status = this.Nodes[this.currentNode].Process(context);

        if (ret == Status.Failure) {
            this.currentNode++;
            return this.OnProcess(context);
        }
        else if (ret == Status.Success) {
            return Status.Success;
        }

        return Status.Running;
    }

    protected OnReset(): void {
        this.currentNode = 0;

        for (var node of this.Nodes) {
            node.Reset();
        }
    }
}
