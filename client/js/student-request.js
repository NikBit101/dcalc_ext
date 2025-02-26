function getModules(student, id, label) {
  // student does NOT exist, display warning message and cancel request
  if (!student.studentModules) {
    label.textContent = `Sorry the student ${id} does not exist`;
    return null;
  }
  label.textContent = `Module marks for ${id} have been loaded`;

  const sModules = student.studentModules.modules;
  // confirm all modules are from level 5, skip level 4's
  const is_LVLFive =
  Object.values(sModules)
    .slice(0, 6)
    .some(module => module.level === 5)
    &&
  Object.values(sModules)
    .slice(0, 6)
    .every(module => module.level === 4 || module.level === 5);

  // confirm whether module grades are from level 5 or 6
  if (is_LVLFive) {
    const LEVEL_5 = [];
    
    Object.values(sModules).slice(0, 6).forEach((module, i) => {
      const modMarks = {
        name: module.name,
        marks: module.marks.agreedModuleMark
      };
      LEVEL_5.push(modMarks);
  
      const modNameInput = document.querySelector(`#l5name${i+1}`);
      const modSlider = document.querySelector(`#l5mark${i+1}`);
      const moduleMarksInput = document.querySelector(`#l5mark${i+1}output`);
      modNameInput.value = modMarks.name;
      // check if marks exist for a specific module (i.e. not null)
      if (modMarks.marks) {
        modSlider.value = modMarks.marks;
        moduleMarksInput.value = modMarks.marks;
      }
    });
    return LEVEL_5;

  } 

  const is_LVL6 =
  Object.values(sModules)
    .slice(0, 5)
    .some(module => module.level === 6)
    &&
  Object.values(sModules)
    .slice(0, 5)
    .every(module => module.level === 4 || module.level === 5 || module.level === 6);

  if (is_LVL6) {
    const LEVEL_6 = [];
    
    const slicedModules = Object.values(sModules).slice(0, 5);
    slicedModules.forEach((module, i) => {
      const isFinalProject = i === slicedModules.length - 1;
      
      const modMarks = {
        name: module.name,
        marks: module.marks.agreedModuleMark
      };
      LEVEL_6.push(modMarks);
      
      if (isFinalProject) {
        const finProject = document.querySelector(`#fyp`);
        const finSlider = document.querySelector(`#fyp.range-input`);
        if (modMarks.marks) {
          finProject.value = modMarks.marks;
          finSlider.value = modMarks.marks;
        }
      } else {

        const modNameInput = document.querySelector(`#l6name${i+1}`);
        const modSlider = document.querySelector(`#l6mark${i+1}`);
        const moduleMarksInput = document.querySelector(`#l6mark${i+1}output`);
        modNameInput.value = modMarks.name;
        // check if marks exist for a specific module (i.e. not null)
        if (modMarks.marks) {
          modSlider.value = modMarks.marks;
          moduleMarksInput.value = modMarks.marks;
        }
      }
    });
    
  }
}

export default async function getStudentData(id, label) {
  const route = `student/SOC/tutorial/${id.slice(2)}/`;
  const response = await fetch(route);
  const { studentModules } = await response.json();
  const student = await getModules({ studentModules }, id, label);
}