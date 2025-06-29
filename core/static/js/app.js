let selectedExam = null;
let selectedYear = null;
let selectedPaymentMethod = null;

function showPage(targetPageId) {
    const pages = ['PagesStart', 'ChoiseExam', 'PaymentPage'];
    const currentPage = pages.find(page => !document.getElementById(page).classList.contains('hidden'));
    
    if (currentPage === targetPageId) return;
    
    const currentEl = document.getElementById(currentPage);
    const targetEl = document.getElementById(targetPageId);
    
    if (currentEl) {
        currentEl.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            currentEl.classList.add('hidden');
            
            targetEl.classList.remove('hidden');
            setTimeout(() => {
                targetEl.classList.remove('opacity-0', 'scale-95');
                targetEl.classList.add('opacity-100', 'scale-100');
            }, 20);
        }, 300);
    } else {
        targetEl.classList.remove('hidden');
        targetEl.classList.add('opacity-100', 'scale-100');
    }
}

function selectExam(el, name) {
    document.querySelectorAll(".exam-item").forEach(item => {
        item.classList.remove("selected-exam");
        item.style.transform = "";
    });
    el.classList.add("selected-exam");
    selectedExam = name;
    
    el.style.transform = "translateY(-3px)";
    setTimeout(() => {
        el.style.transform = "translateY(-2px)";
    }, 300);
}

function showModal({ id = "customModal", title = "", message = "", showConfirm = false, confirmCallback = null }) {
    closeModal(id);

    const modalHtml = `
        <div id="${id}" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center p-5 items-center animate-fade-in" onclick="handleOverlayClick(event, '${id}')">
            <div class="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative animate-scale-in" onclick="event.stopPropagation()">
                <h3 class="text-lg font-bold text-center mb-4 text-[#063eb0]">${title}</h3>
                <div class="text-center text-gray-700 mb-6">${message}</div>
                <div class="flex ${showConfirm ? 'gap-4' : ''} justify-center">
                    ${showConfirm
                        ? `<button onclick="${confirmCallback ? `${confirmCallback}();` : ''} closeModal('${id}')" class="bg-[#063eb0] hover:bg-[#052a7a] text-white px-6 py-2 rounded-full font-semibold transition-all shadow hover:shadow-lg">
                            Valider
                        </button>`
                        : ''
                    }
                    <button onclick="closeModal('${id}')" class="text-[#063eb0] hover:text-white hover:bg-[#063eb0] border border-[#063eb0] px-6 py-2 rounded-full font-semibold transition-all">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.classList.add('overflow-y-hidden');
}

function closeModal(id = "customModal") {
    const modal = document.getElementById(id);
    if (!modal) {
        console.warn(`Modal avec l'ID "${id}" non trouvé`);
        return;
    }

    modal.classList.add('animate-fade-out');
    setTimeout(() => {
        try {
            modal.remove();
            document.body.classList.remove('overflow-y-hidden');
            document.dispatchEvent(new CustomEvent('modalClosed', { 
                detail: { modalId: id } 
            }));
        } catch (error) {
            console.error("Erreur lors de la fermeture du modal:", error);
        }
    }, 300);
}

function showYearModal() {
    if (!selectedExam) {
        showModal({
            title: "Aucun examen sélectionné",
            message: "Veuillez sélectionner un examen avant de continuer."
        });
        return;
    }

    const yearModal = document.getElementById("yearModal");
    yearModal.classList.remove("hidden");
    yearModal.classList.add("flex", "opacity-100");
    document.body.classList.add("overflow-y-hidden");
}

function closeYearModal() {
    const yearModal = document.getElementById("yearModal");
    yearModal.classList.add("opacity-0");
    
    setTimeout(() => {
        yearModal.classList.add("hidden");
        yearModal.classList.remove("flex", "opacity-100");
        document.body.classList.remove("overflow-y-hidden");
    }, 300);
}

function confirmYear() {
    const list = document.getElementById("pickerYearList");
    const center = list.scrollTop + list.clientHeight / 2;
    let selectedValue = null;

    list.querySelectorAll("li").forEach(item => {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        const isCentered = center >= itemTop && center <= itemBottom;
        item.classList.toggle("selected", isCentered);
        if (isCentered) {
            selectedValue = item.textContent.trim();
        }
    });

    if (!selectedValue) {
        showModal({
            title: "Aucune année sélectionnée",
            message: "Veuillez sélectionner une année valide avant de valider."
        });
        return;
    }

    selectedYear = selectedValue;
    closeYearModal();

    showModal({
        title: "Formulaire",
        message: `
            <form id="formModal" class="text-left mb-6">
                <p class="mb-2"><span class="font-bold">Examen:</span> ${selectedExam}</p>
                <p><span class="font-bold">Année:</span> ${selectedYear}</p>
            </form>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom <span class="text-red-500">*</span></label>
                    <input type="text" class="w-full h-12 p-3 border-2 border-[#e7eaf3] rounded-xl focus:border-[#063eb0] transition-colors">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Prénom <span class="text-red-500">*</span></label>
                    <input type="text" class="w-full h-12 p-3 border-2 border-[#e7eaf3] rounded-xl focus:border-[#063eb0] transition-colors">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Code <span class="text-red-500">*</span></label>
                        <input type="text" class="w-full h-12 p-3 border-2 border-[#e7eaf3] rounded-xl focus:border-[#063eb0] transition-colors">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">École <span class="text-red-500">*</span></label>
                        <select class="w-full h-12 p-3 border-2 border-[#e7eaf3] rounded-xl focus:border-[#063eb0] transition-colors">
                            <option value=""></option>
                            <option value="[abc001]">École ABC [abc001]</option>
                            <option value="[def002]">École DEF [def002]</option>
                        </select>
                    </div>
                </div>
            </form>
        `,
        showConfirm: true,
        confirmCallback: "validerChoix"
    });
}

function validerChoix() {
    closeModal();
    
    showModal({
        title: "Traitement en cours",
        message: '<div class="flex justify-center py-4"><div class="w-12 h-12 border-4 border-[#063eb0] border-t-transparent rounded-full animate-spin"></div></div>'
    });
    
    setTimeout(() => {
        closeModal();
        showPage('PaymentPage');
    }, 1500);
}

function selectPaymentMethod(element, method) {
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
        const radio = el.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
    });

    element.classList.add('selected');
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    selectedPaymentMethod = method;
    
    element.style.transform = "scale(0.98)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 200);
}

function processPayment() {
    const formInputs = document.querySelectorAll('#formModal input, #formModal select');
    const phoneInput = document.getElementById('phone');
    
    if (!formInputs[0].value || !formInputs[1].value || !formInputs[2].value || !formInputs[3].value || !phoneInput.value || !selectedPaymentMethod) {
        showModal({
            title: "Champs manquants",
            message: "Veuillez remplir tous les champs obligatoires et sélectionner un mode de paiement."
        });
        return;
    }

    const paymentData = {
        examen: selectedExam,
        annee: selectedYear,
        nom: formInputs[0].value,
        prenom: formInputs[1].value,
        code: formInputs[2].value,
        ecole: formInputs[3].value,
        telephone: phoneInput.value,
        modePaiement: selectedPaymentMethod,
        montant: "150 FCFA"
    };

    alert(`
        Récapitulatif du paiement:
        --------------------------
        Examen: ${paymentData.examen}
        Année: ${paymentData.annee}
        Nom: ${paymentData.nom}
        Prénom: ${paymentData.prenom}
        Code: ${paymentData.code}
        École: ${paymentData.ecole}
        Téléphone: ${paymentData.telephone}
        Mode de paiement: ${paymentData.modePaiement}
        Montant: ${paymentData.montant}
    `);

    showModal({
        title: "Traitement du paiement",
        message: '<div class="flex justify-center py-4"><div class="w-12 h-12 border-4 border-[#063eb0] border-t-transparent rounded-full animate-spin"></div></div>'
    });

    setTimeout(() => {
        closeModal();
        showModal({
            title: "Paiement réussi!",
            message: "Votre paiement a été traité avec succès. Vous pouvez maintenant consulter vos résultats."
        });
    }, 2000);
}

// Initialisation du sélecteur d'année
function initYearPicker() {
    const list = document.getElementById("pickerYearList");
    if (!list) return;

    const currentYear = new Date().getFullYear();
    const target = Array.from(list.querySelectorAll("li")).find(li => li.textContent.trim() === String(currentYear));
    if (target) {
        list.scrollTop = target.offsetTop - list.clientHeight / 2 + target.clientHeight / 2;
    }

    list.addEventListener("scroll", () => {
        const center = list.scrollTop + list.clientHeight / 2;
        list.querySelectorAll("li").forEach(item => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;
            const isCentered = center >= itemTop && center <= itemBottom;
            item.classList.toggle("selected", isCentered);
        });
    });

    setTimeout(() => {
        list.dispatchEvent(new Event("scroll"));
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    initYearPicker();
    
    // Fermer le modal année en cliquant sur l'overlay
    document.addEventListener("click", function(e) {
        if (e.target.id === "yearModal") {
            closeYearModal();
        }
    });
});