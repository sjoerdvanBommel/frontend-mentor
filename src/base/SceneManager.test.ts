import 'jest-canvas-mock';
import { Scene, Object3D } from 'three';
import Avatar from '../avatar/Avatar';
import MainLight from '../lights/MainLight';
import SceneManager from './SceneManager';

let sceneManager: SceneManager;
let canvas: HTMLCanvasElement;

beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 10;

    SceneManager.prototype.buildRenderer = jest.fn();
    sceneManager = new SceneManager(canvas);
});

test('buildCamera sets correct camera properties', () => {

    sceneManager.buildCamera(canvas);

    expect(sceneManager.camera.aspect).toBe(canvas.width / canvas.height);
    expect(sceneManager.camera.fov).toBe(60);
    expect(sceneManager.camera.near).toBe(1);
    expect(sceneManager.camera.far).toBe(100);
    expect(sceneManager.camera.position.x).toBe(0);
    expect(sceneManager.camera.position.y).toBe(0);
    expect(sceneManager.camera.position.z).toBe(10);
});

test('buildSceneObjects returns correct objects and adds them to scene', () => {
    var scene = new Scene();

    var result = sceneManager.buildSceneObjects(scene);

    expect(result.length).toBe(2);
    expect(result[0]).toBeInstanceOf(MainLight);
    expect(result[1]).toBeInstanceOf(Avatar);
    // 1 because asset needs to load
    expect(scene.children.length).toBe(1);
    expect(scene.children[0]).toBeInstanceOf(Object3D);
});