import { DecisionNode } from "./node";

export abstract class Decorator extends DecisionNode {
    public Child: DecisionNode;

    public SetNode(node: DecisionNode): DecisionNode {
        this.Child = node;

        return this;
    }

    protected OnReset(): void {
    }
}