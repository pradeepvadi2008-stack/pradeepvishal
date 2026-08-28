#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

struct Student {
    int rollNumber;
    string name;
    string department;
    float marks;
};

vector<Student> students;

void addStudent() {
    Student s;

    cout << "\nEnter Roll Number: ";
    cin >> s.rollNumber;

    cin.ignore();

    cout << "Enter Student Name: ";
    getline(cin, s.name);

    cout << "Enter Department: ";
    getline(cin, s.department);

    cout << "Enter Marks: ";
    cin >> s.marks;

    students.push_back(s);

    cout << "\nStudent added successfully!\n";
}

void displayStudents() {
    if (students.empty()) {
        cout << "\nNo student records found.\n";
        return;
    }

    cout << "\n================ STUDENT LIST ================\n";

    cout << left
         << setw(10) << "Roll No"
         << setw(25) << "Name"
         << setw(25) << "Department"
         << setw(10) << "Marks"
         << endl;

    cout << "------------------------------------------------------------\n";

    for (const Student& s : students) {
        cout << left
             << setw(10) << s.rollNumber
             << setw(25) << s.name
             << setw(25) << s.department
             << setw(10) << s.marks
             << endl;
    }
}

void searchStudent() {
    int roll;

    cout << "\nEnter Roll Number to search: ";
    cin >> roll;

    bool found = false;

    for (const Student& s : students) {

        if (s.rollNumber == roll) {

            cout << "\nStudent Found!\n";
            cout << "-------------------------\n";
            cout << "Roll Number : " << s.rollNumber << endl;
            cout << "Name        : " << s.name << endl;
            cout << "Department  : " << s.department << endl;
            cout << "Marks       : " << s.marks << endl;

            found = true;
            break;
        }
    }

    if (!found) {
        cout << "\nStudent not found.\n";
    }
}

void deleteStudent() {
    int roll;

    cout << "\nEnter Roll Number to delete: ";
    cin >> roll;

    for (auto it = students.begin(); it != students.end(); ++it) {

        if (it->rollNumber == roll) {

            students.erase(it);

            cout << "\nStudent deleted successfully!\n";
            return;
        }
    }

    cout << "\nStudent not found.\n";
}

int main() {

    int choice;

    while (true) {

        cout << "\n========================================\n";
        cout << "       STUDENT MANAGEMENT SYSTEM\n";
        cout << "========================================\n";

        cout << "1. Add Student\n";
        cout << "2. Display Students\n";
        cout << "3. Search Student\n";
        cout << "4. Delete Student\n";
        cout << "5. Exit\n";

        cout << "\nEnter your choice: ";
        cin >> choice;

        switch (choice) {

            case 1:
                addStudent();
                break;

            case 2:
                displayStudents();
                break;

            case 3:
                searchStudent();
                break;

            case 4:
                deleteStudent();
                break;

            case 5:
                cout << "\nThank you for using Student Management System!\n";
                return 0;

            default:
                cout << "\nInvalid choice. Please try again.\n";
        }
    }

    return 0;
}
