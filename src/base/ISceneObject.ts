interface ISceneObject {
    update(time: number): void;
    activeStates: Set<number>;
    possibleStatesWithActions: Map<number, (time: number) => void>;
}