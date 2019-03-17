import { DecisionNode } from "./decisionnode";

export abstract class Composite extends DecisionNode {
    public Nodes: Array<DecisionNode> = new Array<DecisionNode>();

    public AddNode(...nodes: Array<DecisionNode>): DecisionNode {
        for (const node of nodes) {
            this.Nodes.push(node);
        }

        return this;
    }
}
