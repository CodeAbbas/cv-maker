function toggleEditMode() {
            const body = document.body;
            const editButton = document.getElementById('btn-edit');
            const editableElements = document.querySelectorAll('.editable');
            const isEditing = body.classList.toggle('editing');

            editableElements.forEach(el => {
                el.contentEditable = isEditing;
            });

            if (isEditing) {
                editButton.textContent = 'Save Changes';
                editButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                editButton.classList.add('bg-green-600', 'hover:bg-green-700');
            } else {
                editButton.textContent = 'Edit CV';
                editButton.classList.remove('bg-green-600', 'hover:bg-green-700');
                editButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }
        }

        function deleteItem(button, parentSelector) {
            // Find the closest parent element (li or .experience-item) and remove it
            const itemToDelete = button.closest(parentSelector);
            if (itemToDelete) {
                itemToDelete.remove();
            }
        }

        function addItem(button) {
            // Find the <ul> element that comes just before this button
            const list = button.previousElementSibling;
            if (list && list.tagName === 'UL') {
                const newLi = document.createElement('li');
                newLi.className = 'editable';
                newLi.contentEditable = 'true';
                newLi.innerHTML = 'New item... <button class="edit-controls btn-delete no-print" onclick="deleteItem(this, \'li\')">-</button>';
                
                // Manually style the new button to be visible
                const newDelBtn = newLi.querySelector('.btn-delete');
                newDelBtn.style.display = 'inline-block';

                list.appendChild(newLi);
                newLi.focus(); // Focus on the new item
            }
        }

        function addExperience() {
            const experienceSection = document.getElementById('work-experience');
            const newExperience = document.createElement('div');
            newExperience.className = 'experience-item mb-4';
            
            newExperience.innerHTML = `
                <button class="edit-controls btn-delete no-print" onclick="deleteItem(this, 'experience-item')" style="display: inline-block;">Delete Block</button>
                <h3 class="editable text-lg font-semibold text-gray-800" contenteditable="true">New Job Title</h3>
                <p class="editable text-sm text-gray-600 mb-2" contenteditable="true">Company | Location | Dates</p>
                <ul class="editable-list list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li class="editable" contenteditable="true">
                        New responsibility...
                        <button class="edit-controls btn-delete no-print" onclick="deleteItem(this, 'li')" style="display: inline-block;">-</button>
                    </li>
                </ul>
                <button class="edit-controls btn-add no-print" onclick="addItem(this)" style="display: inline-block;">+ Add Item</button>
            `;
            
            // Find the 'Add Experience' button and insert the new block before it
            const addExpButton = experienceSection.querySelector('.btn-add-section');
            if (addExpButton) {
                experienceSection.insertBefore(newExperience, addExpButton);
            } else {
                experienceSection.appendChild(newExperience); // Fallback
            }
            
            // Focus on the new job title
            newExperience.querySelector('h3').focus();
        }