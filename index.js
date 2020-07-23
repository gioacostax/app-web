#!/usr/bin/env node

/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Command } = require('commander');

const program = new Command().parse(process.argv);
console.log(program);

/**
 * 1. Crear directorio a partir del primer parametro (incluye verificar que no exista uno igual e informar)
 * 2. Clonar plantilla en el directorio nuevo
 * 3. Pedir datos de la app (name, description, author, start_url)
 * 4. Ajustar package.json con los nuevos datos
 * 5. Borrar llave de repositorio en package.json
 * 6. Borrar git y crear uno con el primer commit
 * 7. Ejectuar yarn
 * 8. Pedir al usuario si quiere ejecutar pruebas de scripts (lint, build, test)
 * 9. Mostrar cómo empezar (script start)
 */
