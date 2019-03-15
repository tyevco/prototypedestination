import { Status } from "./status";
import { BehaviorContext } from "./behaviorcontext";


export abstract class DecisionNode {
    public Name: string;
    public Ticks: number = 0;

    protected starting: boolean = true;

    public Process(context: BehaviorContext): Status {
        let ret: Status = this.OnProcess(context);

        this.Ticks++;
        this.starting = false;

        if (ret != Status.Running)
            this.Reset();

        return ret;
    }

    public Reset(): void {
        this.starting = true;
        this.Ticks = 0;
        this.OnReset();
    }

    protected abstract OnProcess(context: BehaviorContext): Status;
    protected abstract OnReset(): void;
}
