import { test, expect, Page } from '@playwright/test';

test('Check title of application', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/RollCall/);
});

async function successLogin(page: Page) {
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByLabel('UP EmailUP Email').fill('astorres1@up.edu.ph');
  await page.getByLabel('PasswordPassword').click();
  await page.getByLabel('PasswordPassword').fill('torres');
  await page.getByRole('button', { name: 'Login' }).click();
}

test('Unsuccessful signup: unavailable UP Email', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('link', { name: 'Create Account' }).click();
  await page.getByLabel('UP ID NumberUP ID Number').fill('202107015');
  await page.getByLabel('First NameFirst Name').click();
  await page.getByLabel('First NameFirst Name').fill('Antonio');
  await page.getByLabel('Last NameLast Name').click();
  await page.getByLabel('Last NameLast Name').fill('Torres');
  await page.getByRole('textbox', { name: 'UP Email' }).click();
  await page.getByRole('textbox', { name: 'UP Email' }).fill('cratienza1@up.edu.ph');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('testpassword');
  await page.getByRole('button', { name: 'Submit' }).click();
  page.on("dialog", async (alert) => {
    const text = alert.message();
    await expect(text == 'User already registered');
    await alert.accept();
})
});

test('Successful signup', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('link', { name: 'Create Account' }).click();
  await page.getByLabel('UP ID NumberUP ID Number').fill('202107015');
  await page.getByLabel('First NameFirst Name').click();
  await page.getByLabel('First NameFirst Name').fill('Antonio');
  await page.getByLabel('Last NameLast Name').click();
  await page.getByLabel('Last NameLast Name').fill('Torres');
  await page.getByRole('textbox', { name: 'UP Email' }).click();
  await page.getByRole('textbox', { name: 'UP Email' }).fill('astorres1@up.edu.ph');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('testpassword');
  await page.getByRole('button', { name: 'Submit' }).click();
  page.on("dialog", async (alert) => {
    const text = alert.message();
    await expect(text == 'User Registration Success');
    await alert.accept();
})
});

test('Successful login redirecting to dashboard', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await expect(page.getByRole('banner').getByText('Dashboard')).toBeVisible();
});

test('Unsuccessful login: incorrect credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByLabel('UP EmailUP Email').fill('cratienza1@up.edu.ph');
  await page.getByLabel('PasswordPassword').click();
  await page.getByLabel('PasswordPassword').fill('notmypassword');
  await page.getByRole('button', { name: 'Login' }).click();
  page.on("dialog", async (alert) => {
    const text = alert.message();
    await expect(text == 'Invalid Login!');
    await alert.accept();
})
});


test('Navigate to Scan tab', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.getByText('Scan', { exact: true }).click();
  await expect(page.getByRole('banner').getByText('Scan QR Code')).toBeVisible();
});


test('Navigate to Profile tab', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.locator('#tab-button-Profile').getByText('Profile').click();
  await expect(page.getByRole('banner').getByText('Profile')).toBeVisible();
});

test('Student succesfully enrolls in class', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.getByRole('button', { name: 'Add Class' }).click();
  await page.getByLabel('Enrollment KeyEnrollment Key').fill('4');
  await page.getByRole('button', { name: 'Enroll' }).click();
  page.on("dialog", async (alert) => {
    const text = alert.message();
    await expect(text == 'Succesfully added class!');
    await alert.accept();
})
});

test('Student attempts to enroll in already enrolled class', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.getByRole('button', { name: 'Add Class' }).click();
  await page.getByLabel('Enrollment KeyEnrollment Key').fill('1');
  await page.getByRole('button', { name: 'Enroll' }).click();
  page.on("dialog", async (alert) => {
    const text = alert.message();
    await expect(text == 'duplicate key value violates unique constraint "learners_pkey"');
    await alert.accept();
})
});

test('Student clicks a class', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.getByText('How to8:30 PMHi helloProf.').click();
  await expect(page.getByRole('heading', { name: 'Attendance Report' })).toBeVisible();
});

test('Professor logs in account', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByLabel('UP EmailUP Email').fill('professor@gmail.com');
  await page.getByLabel('PasswordPassword').click();
  await page.getByLabel('PasswordPassword').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Professor')).toBeVisible();
});

test('Professor clicks a class', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByLabel('UP EmailUP Email').fill('professor@gmail.com');
  await page.getByLabel('PasswordPassword').click();
  await page.getByLabel('PasswordPassword').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();  
  await page.getByText('Web Development Frameworks1:00 PMIntro to IonicProf. William Proffie').click();
  await expect(page.getByRole('heading', { name: 'Attendance Report' })).toBeVisible();
});

test('Professor generates QR', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByLabel('UP EmailUP Email').fill('professor@gmail.com');
  await page.getByLabel('PasswordPassword').click();
  await page.getByLabel('PasswordPassword').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();  
  await page.getByText('Generate').click();
  await page.locator('div').filter({ hasText: /^Select class$/ }).first().click();
  await page.getByRole('radio', { name: 'Web Development Frameworks' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Generate QR Code' }).click();
  await expect(page.getByRole('img', { name: 'QR Code' })).toBeVisible();
});

/*
test('Professor creates a class', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next' }).first().click();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByLabel('UP EmailUP Email').fill('professor@gmail.com');
  await page.getByLabel('PasswordPassword').click();
  await page.getByLabel('PasswordPassword').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();  
  await page.getByRole('button', { name: 'Create Class' }).click();
  await page.getByLabel('Class Enrollment KeyClass').fill('class2');
  await page.getByLabel('Class NameClass Name').click();
  await page.getByLabel('Class NameClass Name').fill('class2');
  await page.getByLabel('Class TitleClass Title').click();
  await page.getByLabel('Class TitleClass Title').fill('class2');
  await page.getByText('Select a Semester').click();
  await page.getByRole('button', { name: '2nd Semester' }).click();
  await page.getByLabel('Academic YearAcademic Year').click();
  await page.getByLabel('Academic YearAcademic Year').fill('2023-2024');
  await page.getByLabel('Start TimeStart Time').click();
  await page.getByLabel('Start TimeStart Time').fill('23:30');
  await page.getByLabel('End TimeEnd Time').click();
  await page.getByLabel('End TimeEnd Time').fill('12:30');
  await page.getByLabel('Max No. of AbsencesMax No. of').click();
  await page.getByLabel('Max No. of AbsencesMax No. of').fill('7');
  await page.getByRole('button', { name: 'Enroll' }).click();
  await expect(page.getByText('Successfully added class!')).toBeVisible();


});
/*
test('Student scans and marks attendance in an enrolled class', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.goto('../app/dashboard/attendance/1');
  await page.locator('label').getByRole('img').click();
  await page.getByRole('button', { name: 'Confirm Attendance' }).click();
  await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible;
});

test('Student scans and marks attendance in an unenrolled class', async ({ page }) => {
  await page.goto('/');
  successLogin(page);
  await page.goto('../app/dashboard/attendance/5');
  await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible;
});
*/
