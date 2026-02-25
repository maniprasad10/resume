// Initialize resume on page load
document.addEventListener('DOMContentLoaded', function () {
    updateResume();

    // Auto-update on input change for better UX
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updateResume);
    });
});

function updateResume() {
    // Get all input values
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || 'phone number';
    const linkedin = document.getElementById('linkedin').value || '#';
    const github = document.getElementById('github').value || '#';
    const objective = document.getElementById('objective').value || 'Your objective...';
    const university = document.getElementById('university').value || 'Your University';
    const degree = document.getElementById('degree').value || 'Your Degree';
    const gradYear = document.getElementById('gradYear').value || 'YYYY';
    const skillsInput = document.getElementById('skills').value || '';
    const projectsInput = document.getElementById('projects').value || '';

    // Update basic fields
    document.getElementById('resumeName').textContent = fullName;
    document.getElementById('resumeEmail').textContent = email;
    document.getElementById('resumePhone').textContent = phone;
    document.getElementById('resumeLinkedin').textContent = linkedin.split('/').pop() || 'LinkedIn';
    document.getElementById('resumeLinkedin').href = linkedin;
    document.getElementById('resumeGithub').textContent = github.split('/').pop() || 'GitHub';
    document.getElementById('resumeGithub').href = github;
    document.getElementById('resumeObjective').textContent = objective;
    document.getElementById('resumeUniversity').textContent = university;
    document.getElementById('resumeDegree').textContent = degree;
    document.getElementById('resumeGradYear').textContent = gradYear;

    // Update skills
    const skillsList = document.getElementById('resumeSkills');
    skillsList.innerHTML = '';
    if (skillsInput) {
        const skills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }

    // Update projects
    const projectsContainer = document.getElementById('resumeProjects');
    projectsContainer.innerHTML = '';
    if (projectsInput) {
        const projects = projectsInput.split('\n').filter(project => project.trim());
        projects.forEach(project => {
            const [title, tech, desc] = project.split('|').map(part => part.trim());
            if (title) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-item';
                projectDiv.innerHTML = `
                    <h4>${title}</h4>
                    ${tech ? `<p><strong>Tech:</strong> ${tech}</p>` : ''}
                    ${desc ? `<p>${desc}</p>` : ''}
                `;
                projectsContainer.appendChild(projectDiv);
            }
        });
    }
}

// Print functionality
function printResume() {
    const resumeContent = document.querySelector('.resume').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .resume-header h1 { font-size: 2.5em; text-align: center; }
                .contact-info { text-align: center; font-size: 16px; }
                .resume-section h2 { color: #333; border-bottom: 2px solid #ccc; }
                #resumeSkills { list-style: none; display: flex; flex-wrap: wrap; }
                #resumeSkills li { background: #007acc; color: white; padding: 5px 10px; margin: 5px; border-radius: 15px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>${resumeContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
