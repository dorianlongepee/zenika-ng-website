# Questions chapitres

Lab 1:

- L'énoncé est différent du rendu de la CLI, peut être mettre à jour la formation ?

Lab 3:

- Lors de la création du composant Products, je me suis rendu compte qu'on passait le lien entier des images dans la création des objets Products (JSON). Y'a t'il moyen de donner juste le nom du fichier et de faire du "string literal" dans le template ?

Lab 5: pas d'indication sur la création de getter dans la slide associé.

readonly input/output/signaux pour pas casser angular
convention kebab case pour les noms de fichiers et de composants

// describe('Message', () => {
// const message = () => fixture.debugElement.query(
// By.css('[data-testid="emptyMessage"]')
// );

// const setTestData = ({ hasProductsInStock = true }: { hasProductsInStock?: boolean } = {}) => {
// (catalogService as unknown as CatalogStubService).hasProductsInStock.set(
// hasProductsInStock
// );
// fixture.detectChanges();  
 // };

// it('true', () => {
// setTestData({
// hasProductsInStock: true
// });

// expect(message).toBeNull();
// });

// it('false', () => {
// setTestData({
// hasProductsInStock: false
// });

// expect(message).not.toBeNull();
// });

// });
