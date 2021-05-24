interface ISceneObject {
    update(time: number): void;
    activeStates: Set<number>;
    statesWithActions: IStateAction[];
}

interface IStateAction {
    [state: number]: (time: number) => void
}