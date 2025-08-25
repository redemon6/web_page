-- Task 1: Employees with Salary Below Department Average  
-- 📌 Use case: Identify employees underpaid relative to peers in the same department.
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    e.salary,
    d.department_name,
    ROUND(avg_dept_salary, 2) AS department_avg_salary
FROM HR.employees e
JOIN (
    SELECT department_id, AVG(salary) AS avg_dept_salary
    FROM HR.employees
    GROUP BY department_id
) dept_avg ON e.department_id = dept_avg.department_id
JOIN hr.departments d ON e.department_id = d.department_id
WHERE e.salary < dept_avg.avg_dept_salary
ORDER BY d.department_name, e.salary;



-- Task 2: Departments with salary cost exceeding $100,000
SELECT 
    d.department_id,
    d.department_name,
    ROUND(SUM(e.salary + NVL(e.commission_pct * e.salary, 0)), 2) AS total_salary_cost
FROM HR.departments d
JOIN HR.employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING SUM(e.salary + NVL(e.commission_pct * e.salary, 0)) > 100000
ORDER BY total_salary_cost DESC;



-- Task 3: Country-wise Headcount and Manager Count
-- 📌 Use case: Country-level HR metrics and management coverage.
SELECT 
    c.country_name,
    COUNT(e.employee_id) AS total_employees,
    COUNT(DISTINCT m.employee_id) AS total_managers
FROM HR.employees e
JOIN HR.departments d ON e.department_id = d.department_id
JOIN HR.locations l ON d.location_id = l.location_id
JOIN HR.countries c ON l.country_id = c.country_id
LEFT JOIN HR.employees m ON e.manager_id = m.employee_id
GROUP BY c.country_name
ORDER BY total_employees DESC;



-- Task 4: Upcoming Work Anniversaries (Next 30 Days)
-- 📌 Use case: HR notifications for upcoming employee anniversaries.
SELECT 
    employee_id,
    first_name || ' ' || last_name AS employee_name,
    hire_date,
    TO_CHAR(hire_date, 'Month DD') AS anniversary_date,
    FLOOR(MONTHS_BETWEEN(SYSDATE, hire_date)/12) + 1 AS anniversary_year
FROM HR.employees
WHERE TO_CHAR(hire_date, 'MMDD') BETWEEN TO_CHAR(SYSDATE, 'MMDD') AND TO_CHAR(SYSDATE + 30, 'MMDD')
ORDER BY TO_CHAR(hire_date, 'MMDD');



-- Task 5: Career Progression Path – Track Employees Through Job History
-- 📌 Use case: Trace internal promotions or role changes.
SELECT 
    e.employee_id,
    e.first_name || ' ' || e.last_name AS employee_name,
    jh.start_date,
    jh.end_date,
    j1.job_title AS from_job,
    j2.job_title AS to_job
FROM HR.job_history jh
JOIN HR.jobs j1 ON jh.job_id = j1.job_id
JOIN HR.employees e ON jh.employee_id = e.employee_id
JOIN HR.jobs j2 ON e.job_id = j2.job_id
WHERE jh.job_id != e.job_id
ORDER BY e.employee_id, jh.start_date;



-- Task 6: Identify Employees Likely to Resign Soon (Pattern-based and Time-based Filters)
-- 📌 Employees who have job titles containing "Rep", "Clerk", or "Assistant" (often entry-level roles), 
-- were hired between 5 and 10 years ago (possibly stagnated), 
-- are earning below the average salary for their job, 
-- work in departments with a known churn pattern (i.e., names like "Sales", "Administration", etc.)
WITH avg_salary_per_job AS (
    SELECT 
        job_id,
        ROUND(AVG(salary), 2) AS avg_salary
    FROM HR.employees
    GROUP BY job_id
),
filtered_employees AS (
    SELECT 
        e.employee_id,
        e.first_name || ' ' || e.last_name AS employee_name,
        j.job_title,
        d.department_name,
        e.salary,
        e.hire_date,
        ROUND(MONTHS_BETWEEN(SYSDATE, e.hire_date) / 12, 1) AS years_with_company,
        a.avg_salary
    FROM HR.employees e
    JOIN HR.jobs j ON e.job_id = j.job_id
    JOIN HR.departments d ON e.department_id = d.department_id
    JOIN avg_salary_per_job a ON e.job_id = a.job_id
    WHERE (
        j.job_title LIKE '%Rep%' OR 
        j.job_title LIKE '%Clerk%' OR 
        j.job_title LIKE '%Assistant%'
    )
    AND d.department_name LIKE '%Sales%' OR d.department_name LIKE '%Admin%'
    AND MONTHS_BETWEEN(SYSDATE, e.hire_date) / 12 BETWEEN 5 AND 10
    AND e.salary < a.avg_salary
)
SELECT *
FROM filtered_employees
ORDER BY years_with_company DESC, salary ASC;

