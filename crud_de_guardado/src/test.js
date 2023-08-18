const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--headless'))  // Ejecución en segundo plano
    .build();

  try {
    await driver.get('http://localhost:3000');  // Reemplaza con la URL de tu aplicación

    // Prueba 1: Testear el botón de crear
    const crearButton = await driver.findElement(By.css('Button[color="success"]'));
    await crearButton.click();

    // Prueba 2: Testear la caja de texto del nombre
    const nombreInput = await driver.findElement(By.name('nombre'));  // Reemplaza 'nombre' con el atributo 'name' del input
    await nombreInput.sendKeys('Texto de prueba');

    // Prueba 3: Testear el botón de insertar
    const insertarButton = await driver.findElement(By.css('Button[color="primary"]'));
    await insertarButton.click();

    // Prueba 4: Testear el botón de cancelar
    const cancelarButton = await driver.findElement(By.css('Button.btn-danger'));
    await cancelarButton.click();

    // Agrega más pruebas según tus necesidades

  } finally {
    await driver.quit();
  }
})();
