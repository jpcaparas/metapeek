#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import exifr from 'exifr';

const program = new Command();

program
  .version('1.0.0')
  .description('Metapeek - Extract image metadata from image files')
  .arguments('<imagePath>')
  .action(async (imagePath: string) => {
    try {
      console.log('banana');
      const metadata = await exifr.parse(imagePath);
    } catch (err: any) {
      console.error(`Error reading metadata from ${imagePath}:`, err.message);
    }
  });

// If no arguments, prompt the user
if (process.argv.length <= 2) {
  inquirer
    .prompt([
      {
        name: 'imagePath',
        message: 'Enter the path to your image:',
        validate: (input: string) => !!input || 'Please provide a valid image path.'
      },
    ])
    .then(answers => {
      program.parse([process.argv[0], process.argv[1], answers.imagePath]);
    });
} else {
  program.parse(process.argv);
}
