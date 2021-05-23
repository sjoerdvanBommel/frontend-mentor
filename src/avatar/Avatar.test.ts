import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';
import Avatar from './Avatar';

test('Constructor initializes loader, loads avatar and adds it to the scene', () => {
    let scene = new Scene();
    let loader = new GLTFLoader();
    loader.load = jest.fn();
    let avatar = new Avatar(scene, loader);
    
    expect(avatar.loader).toBe(loader);
    expect(avatar.loader.load).toBeCalledWith('./../../models/avatar.glb', expect.any(Function), expect.any(Function), expect.any(Function));
});