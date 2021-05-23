import { Scene, SpotLight, Vector3, Color } from 'three';
import MainLight from './MainLight';

test('Constructor adds spotlight with correct properties to scene', () => {
    var scene = new Scene();
    var mainLight = new MainLight(scene);

    expect(mainLight.spotlight.color).toStrictEqual(new Color(0xffffff));
    expect(mainLight.spotlight.position).toStrictEqual(new Vector3(1, 1, 7));
    expect(mainLight.spotlight.castShadow).toBeTruthy();

    expect(mainLight.spotlight.shadow.mapSize.width).toBe(1024);
    expect(mainLight.spotlight.shadow.mapSize.height).toBe(1024);

    expect(mainLight.spotlight.shadow.camera.near).toBe(500);
    expect(mainLight.spotlight.shadow.camera.far).toBe(4000);
    expect(mainLight.spotlight.shadow.camera.fov).toBe(30);

    expect(scene.children.length).toBe(1);
    expect(scene.children[0]).toBe(mainLight.spotlight);
});