(function (){
    'use strict';

    angular
        .module('studentGradesApp')
        .config(translationConfig);

    translationConfig.$inject = ['$translateProvider'];

    function translationConfig($translateProvider) {
      $translateProvider.translations('en', {
        'STUDENT_MENU_BAR': 'Student',
        'COURSE_MENU_BAR': 'Course',
        'TEST_MENU_BAR': 'Test',
        'CHANGE_LANGUAGE_MENU_BAR': 'Change language',
        'STUDENT_LIST': 'List of all students',
        'STUDENT_FIRST_NAME': 'First name',
        'STUDENT_LAST_NAME': 'Last name',
        'STUDENT_LABEL_UPDATE_STUDENT': 'Update student',
        'STUDENT_LABEL_DELETE_STUDENT': 'Delete student',
        'STUDENT_LABEL_ADD_STUDENT': 'Add student',
        'STUDENT_LABEL_NO_STUDENT': 'There is no registered student',
        'STUDENT_REGISTERED_FOR': 'Registered for',
        'STUDENT_AVAILABLE_COURSES': 'Available courses',
        'STUDENT_POPUP_OK': 'Ok',    
        'STUDENT_POPUP_CANCEL': 'Cancel',
        'COURSE_LIST': 'List of all  courses',
        'COURSE_NUMBER': 'Course number',
        'COURSE_NAME': 'Course name',
        'COURSE_LABEL_UPDATE_COURSE': 'Update course',
        'COURSE_LABEL_DELETE_COURSE': 'Delete course',
        'COURSE_LABEL_ADD_COURSE': 'Add course',
        'COURSE_LABEL_NO_COURSE': 'There is no registered course',
        'COURSE_POPUP_OK': 'Ok',    
        'COURSE_POPUP_CANCEL': 'Cancel',
        'COURSE_POPUP_NUMBER_COURSE': 'Number',    
        'COURSE_POPUP_NAME_COURSE': 'Name',
        'GENERAL_MESSAGE_EMPTY_FORM': 'Please fill in the form',
        'TEST_LABEL_ADD_TEST': 'Add test',
        'TEST_NAME': 'Test name',
        'TEST_LABEL_UPDATE_TEST': 'Update test',
        'TEST_LABEL_DELETE_TEST': 'Delete test',
        'TEST_LABEL_NO_TEST': 'Choose a course to display list of students',
        'TEST_LABEL_SELECT_COURSE': 'Select a course',
        'TEST_STUDENT_FIRST_NAME': 'Student first name',
        'TEST_STUDENT_LAST_NAME': 'Student last name',
        'TEST_STUDENT_GRADE': 'Grade',
        'TEST_LABEL_UPDATE_THIS_TEST': 'Update this test',
        'TEST_LABEL_CREATE_NEW_TEST': 'Create a new test',
        'TEST_LABEL_NO_STUDENT_FOR_THIS_COURSE': 'There is no enrolled student for this course',
        'TEST_FORM_SAVE_TEST': 'Save test',
        'TEST_FORM_TEST_CANCEL': 'Cancel',
        'TEST_FORM_LABEL_COURSE_NAME': 'Course name'
      });
 
      $translateProvider.translations('fr', {
        'STUDENT_MENU_BAR': 'Élève',
        'COURSE_MENU_BAR': 'Matière',
        'TEST_MENU_BAR': 'Examen',
        'CHANGE_LANGUAGE_MENU_BAR': 'Changer la langue',
        'STUDENT_LIST': 'Liste des élèves',
        'STUDENT_FIRST_NAME': 'Prénom',
        'STUDENT_LAST_NAME': 'Nom',
        'STUDENT_LABEL_UPDATE_STUDENT': 'Modifier un élève',
        'STUDENT_LABEL_DELETE_STUDENT': 'Supprimer un élève',
        'STUDENT_LABEL_ADD_STUDENT': 'Ajouter un élève',
        'STUDENT_LABEL_NO_STUDENT': 'Il n\'y a pas d\'élève enregistré',
        'STUDENT_REGISTERED_FOR': 'Inscrit aux cours',
        'STUDENT_AVAILABLE_COURSES': 'Cours disponibles',
        'STUDENT_POPUP_OK': 'Ok',   
        'STUDENT_POPUP_CANCEL': 'Annuler',
        'COURSE_LIST': 'Liste des cours',
        'COURSE_NUMBER': 'Numéro du cours',
        'COURSE_NAME': 'Nom du cours',
        'COURSE_LABEL_UPDATE_COURSE': 'Modifier le cours',
        'COURSE_LABEL_DELETE_COURSE': 'Supprimer le cours',
        'COURSE_LABEL_ADD_COURSE': 'Ajouter un cours',
        'COURSE_LABEL_NO_COURSE': 'Il n\'y a pas de cours enregistré ',
        'COURSE_POPUP_OK': 'Ok',    
        'COURSE_POPUP_CANCEL': 'Annuler',
        'COURSE_POPUP_NUMBER_COURSE': 'Nombre',    
        'COURSE_POPUP_NAME_COURSE': 'Nom',
        'GENERAL_MESSAGE_EMPTY_FORM': 'Veuillez remplir le formulaire',
        'TEST_LABEL_ADD_TEST': 'Ajouter un examen',
        'TEST_NAME': 'Nom de l\'examen',
        'TEST_LABEL_UPDATE_TEST': 'Modifier l\'examen',
        'TEST_LABEL_DELETE_TEST': 'Supprimer l\'examen',
        'TEST_LABEL_NO_TEST': 'Choisissez une matière pour faire apparâitre les étudiants',
        'TEST_LABEL_SELECT_COURSE': 'Choisissez une matière',
        'TEST_STUDENT_FIRST_NAME': 'Prénom de l\'élève',
        'TEST_STUDENT_LAST_NAME': 'Nom de l\'élève',
        'TEST_STUDENT_GRADE': 'Note',
        'TEST_LABEL_UPDATE_THIS_TEST': 'Modifier cet examen',
        'TEST_LABEL_CREATE_NEW_TEST': 'Créer un nouvel examen',
        'TEST_LABEL_NO_STUDENT_FOR_THIS_COURSE': 'Il n\'a pas d\'élève dans cette matière',
        'TEST_FORM_SAVE_TEST': 'Sauvegarder l\'examen',
        'TEST_FORM_TEST_CANCEL': 'Annuler',
        'TEST_FORM_LABEL_COURSE_NAME': 'Nom de la matière'
      });
 
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    }

})();
