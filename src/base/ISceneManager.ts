export default interface ISceneManager {
    update(): void;
    onWindowResize({ width, height }: { width: number, height: number }): void;
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
}