# Documentation

## Task 1	

- Part 1 -- outline the context of testing: why are you testing the application?

    Testing is to identify the quality and reliability of the software product as well as provide information for the organisation or stakeholder to determine the status of the product. There is different type of testing where some is perform after software developed while some is perform during development such as test-driven development.

    Application testing is perform to ensure that the application is working, secure, no issues and ready to ship to the public or market. Most of the time, developer would tend to break up some working functionality of the software when developing new feature which testing would help to determine if the newly implement feature would break the application or create any issues to the product.

- Part 2 -- outline the scope of the testing:

    - what have you identified to test?

        We have implemented the queue and binary search tree to aid our development for the logging application. In order to ensure that, when adding a log into the queue and remove a log form the queue would perform as intended, we have created some test case to test for potential issues that may affect our logging application to fail.

    - how much of the application are you testing?

        So far we have created test case to test for back end function for our logging application such as binary search tree for return the correct log based on timestamp and others as well as for queue. All of these test case is perform using third party package such as jest to run simple test case. Other part of application which is not tested with jest, we only perform manually simple test case to ensure that we have minimum viable product to achieve the application requirement.

- Part 3 -- outline the standards and methodology you are using:
    - Standards: what is the benchmark for the suite of tests passing? What will occur if the tests fail?
    
        In our test case, we are create test based on the hypotically result where one action of the application is determine to be of this result such that when remove an item from an empty queue would return an empty array. This is to ensure that when developing the queue method, we will be able to perform the correct result for each action. If the test fail, it would only mean that either the test case has logical error or the develop code has error.

    - Methodology: what is your method and objective in conducting tests - unit testing, integration testing, performance testing, or end to end testing.

        We have implement unit testing for our queue and binary search tree to ensure that both data structure manipulation technique work as intended before developing our logging application. Unit testing is to test individual component of the whole application such as one feature of the software to ensure that it works as intended as well as not breaking other feature function of the software. Our objective of performing unit testing is to make sure that our unit is complete to aid for furthere development in our application.

- Part 4 -- outline tests you will run and the tools you will use to conduct the tests, you must:
    
    - plan at least three tests of code

        1. test the returning of the empty queue and empty binary search tree
        2. test the element addition and element removal into the queue and BST
        3. Test the function of returning an array from queue
        4. test the BST returning the correct element based on timestamp searching using range function
    
    - identify the Javascript testing framework that you will use

        The javascript testing framework we will be using in our application is JEST. Jest provide the necessary module to help perform test based on the test case created using the format provided and only need to run ``` npm test ```.

- Part 5 -- outline the types and structure of input data required to conduct the tests

    The input data require to conduct the tests is just sample random dummy data such as a string to represent the original log. The normal created log file from the backend of application contain an unique id, a severity level based on the algorithm, the type fo the log as well as the timestamp of the error record generated. This make up the structure of a log file and the timestamp is use for searching and sorting along with the severity. Test would only require dummy data because this is a testing create before the code implementation which mean we just need to ensure the functionality and we will not have real generated log data.

- Part 6 -- outline the steps you will take to conduct each test in terms of:

    - what test cases will you use for each test
        
        In our application, these test case is create before developing our code such as test driven development which the test case would be use as the guide to develop the code. Most of the test cases would outline the potential outcome of the function and the test case would potentailly test all the possibility.

    - how you will document the results

        Each result or output from all the created test case using jest would be save into a file call test_report.txt 

    - what you expect the results to be for given test cases

        Most of the expected result would failed as we create the test case based on the potential output of function as well as the expected logical output of the function. Then we will proceed to develop the code to make the test pass.

    - benchmarks for the test passing

        Each test case has a requirement to pass such as each test case expect the function to return something simple such as an empty array or return an array of all element. For example, when removing an element from an empty array would just return an empty array and nothing else. 

## Task 2	

- Part 1,2,4

    Completed task stored within the test folder

- Part 3 -- Based on the results of your tests, produce a test results report which outlines the following and includes:

    - the results of the tests

        In our test case, all of the implemented code has been completed thus it has passed all the test. The sample test result is store within test folder.

    - your evaluation of whether the tests were effective in identifying defects in the application
    
        In our code development for the feature of the queue and bst, we are able to detect some logical flaw for the code implementation which help to seek for fix for our code.

    - how you would fix a defect in the application as a result of testing and debugging

        First we would see what is the result of failure for the test. Then we would deduce of what cause the result to be wrong as well as what could be fix to make our test pass. In order to make it more clear, we can console log in the function to check if out logic is correct when the code run and it is useful for debugging as well.