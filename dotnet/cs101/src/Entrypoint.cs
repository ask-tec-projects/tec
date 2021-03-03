using System;
using System.Collections.Generic;
using System.Linq;
using Education;

namespace cs101
{
    class Entrypoint
    {
        public static void print_enumerable_object<EnumerableItemType>(IEnumerable<EnumerableItemType> items, string prefix="") {
            foreach (EnumerableItemType item in items) {
                Console.WriteLine(prefix + item.ToString());
            }
        }

        public static void Main(string[] args) {
            List<Student> studentsList = new List<Student>()
            {
                new Student(){ id=1, name="S1", addressId=1},
                new Student(){ id=2, name="S2", addressId=2},
                new Student(){ id=3, name="S3", addressId=1},
                new Student(){ id=4, name="S4", addressId=3},
                new Student(){ id=5, name="S5", addressId=0},
            };
            List<Address> addressList = new List<Address>()
            {
                new Address(){ id=1, address="lækker vej 1"},
                new Address(){ id=2, address="lækker vej 2"},
                new Address(){ id=3, address="lækker vej 3"},
                new Address(){ id=4, address="lækker vej 4"},
            };
            List<Mark> marksList = new List<Mark>()
            {
                new Mark(){ id=1, studentId=1,grade=70},
                new Mark(){ id=2, studentId=5,grade=77},
                new Mark(){ id=3, studentId=4,grade=88},
            };

            var student_query = from student in studentsList
                                join address in addressList
                                    on student.addressId equals address.id
                                join mark in marksList
                                    on student.id equals mark.studentId
                                select new {
                                    student.id,
                                };

            print_enumerable_object(student_query);
        }
    }
}
