interface IInteractiveSceneObject extends ISceneObject {
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
}