import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            // Traverse and modify materials for a developer theme
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const name = child.name;
                if (name === "BODYSHIRT" || name === "Cube002") {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0x323232); // Charcoal gray shirt
                  mat.roughness = 0.7;
                  mesh.material = mat;
                } else if (name === "Pant") {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0x1c1c1c); // Dark charcoal pants
                  mat.roughness = 0.8;
                  mesh.material = mat;
                } else if (name === "Shoe") {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0x222222); // Charcoal shoe
                  mat.roughness = 0.6;
                  mesh.material = mat;
                } else if (name === "Sole") {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0xdcdcdc); // Off-white sole
                  mat.roughness = 0.5;
                  mesh.material = mat;
                }
              }
            });

            // Add developer cap to hair
            const hair = character.getObjectByName("hair") as THREE.Mesh;
            if (hair) {
              const capGroup = new THREE.Group();
              capGroup.name = "capGroup";

              const capMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a, // Off-black / dark charcoal
                roughness: 0.8,
                metalness: 0.1,
                side: THREE.DoubleSide
              });

              // Cap dome
              const domeGeo = new THREE.SphereGeometry(0.118, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
              const dome = new THREE.Mesh(domeGeo, capMaterial);
              dome.castShadow = true;
              dome.receiveShadow = true;
              dome.position.set(0.002, 0.03, 0.015);
              dome.scale.set(1.0, 0.9, 1.05);
              capGroup.add(dome);

              // Cap visor
              const visorGeo = new THREE.BoxGeometry(0.18, 0.004, 0.08);
              const visor = new THREE.Mesh(visorGeo, capMaterial);
              visor.castShadow = true;
              visor.receiveShadow = true;
              visor.position.set(0.002, 0.03, 0.145);
              visor.rotation.x = 0.18;
              capGroup.add(visor);

              hair.add(capGroup);
            }
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
