import fs from 'fs';

async function getModuleNames() {
    try {
      const modulesData = await fs.promises.readFile('D:/DRepos/dcalc_ext/client/modules.json', { encoding: 'utf-8' });
      const modules = JSON.parse(modulesData);
      const moduleNames = modules.map(module => module.module_name);
      return moduleNames;
    } catch (e) {
      console.error('Failed to load list of modules', e);
      return [];
    }
  }
  
getModuleNames().then(moduleNames => console.log(moduleNames));

//This code works at creating an array with all the module names in, but attempts at making it output them based on year type have all failed.