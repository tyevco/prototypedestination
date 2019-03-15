import { DecisionNode } from "./node";


export abstract class Composite extends DecisionNode {
    public Nodes: Array<DecisionNode> = new Array<DecisionNode>();

    public AddNode(...nodes: DecisionNode[]): DecisionNode {

        for (let node of nodes) {
            this.Nodes.push(node);
        }

        return this;
    }
}