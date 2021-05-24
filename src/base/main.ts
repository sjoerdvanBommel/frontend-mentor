import ISceneManager from './ISceneManager';
import SceneManager from './SceneManager';

class Main {
    canvas: HTMLCanvasElement;
    sceneManager: ISceneManager;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.sceneManager = new SceneManager(this.canvas);

        this.bindEventListeners();
        this.render();
    }

    bindEventListeners(): void {
        window.onresize = () => this.resizeCanvas();
        window.onkeydown = (e: KeyboardEvent) => this.sceneManager.onKeyDown(e);
        window.onkeyup = (e: KeyboardEvent) => this.sceneManager.onKeyUp(e);
        this.resizeCanvas();	
    }

    resizeCanvas(): void {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        this.canvas.width  = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.sceneManager.onWindowResize(this.canvas);
    }
    
    render(): void {
        requestAnimationFrame(() => this.render());
        this.sceneManager.update();
    }
}

new Main();