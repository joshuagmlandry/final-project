# Joshua Landry - Final Project (Loon - camping made easy)

![Loon homepage](https://res.cloudinary.com/dlfu6niut/image/upload/v1655145870/Screen_Shot_2022-06-13_at_14.42.19_PM_ny0jne.png)

Loon was created in June 2022 in Montreal, QC as both a web development course project and a potential tool for campers using the Canadian national park system. After the repeated experience of arriving at a campsite and wishing that the photos and description of it online more accurately reflected the actual site, Loon founders envisioned a solution: an application showcasing user reviews of campsites across the Parks Canada network. Loon has been made possible with the integration of the ArcGIS API for JS, open Parks Canada data from the Government of Canada, Auth0, reCAPTCHA, Cloudinary, as well as park images/descriptions from the Parks Canada website and original photos by Nora St-Aubin.

## Main features

The application has several key features, which include:

### Searching for campsites

Users can search for campsites by province/territory or campsite ID.  Once queried, users can click on each campsite marker and see details for the site.  Each province/territory page lists of all parks/places and as well as their respective campgrounds.

![Search by province](https://res.cloudinary.com/dlfu6niut/image/upload/v1655144009/Screen_Shot_2022-06-13_at_14.11.05_PM_u5gbhn.png)

![All parks and campgrounds](https://res.cloudinary.com/dlfu6niut/image/upload/v1655144008/Screen_Shot_2022-06-13_at_14.11.21_PM_gfjivd.png)

Additionally, users can use the Browse option to view and filter through all parks across Canada.  Both maps feature a Locate Me button to help find nearby campsites.

![Browse feature](https://res.cloudinary.com/dlfu6niut/image/upload/v1655144011/Screen_Shot_2022-06-13_at_14.12.10_PM_xzbj6k.png)

### User profiles

Users can sign up/log in via Auth0.  Once a member, a bio can be added (and updated) and users can save their favourite campsites as well as leave reviews.  Favourites and reviews can be deleted from the profile page.

![User profile](https://res.cloudinary.com/dlfu6niut/image/upload/v1655145869/Screen_Shot_2022-06-13_at_14.43.19_PM_v8vdhy.png)

Logged in, verified users are also able to view the profiles, which displays the name, bio, and reviews, of other verified users.

![User profile](https://res.cloudinary.com/dlfu6niut/image/upload/v1655146498/Screen_Shot_2022-06-13_at_14.54.36_PM_sweocj.png)

### Post reviews

Users can post reviews and ratings for all campsites.  Photos can be uploaded along with the review and the user must complete a reCAPTCHA validation prior to posting their review.

![Reviews page](https://res.cloudinary.com/dlfu6niut/image/upload/v1655145869/Screen_Shot_2022-06-13_at_14.43.39_PM_wmubei.png)

![Review form](https://res.cloudinary.com/dlfu6niut/image/upload/v1655145868/Screen_Shot_2022-06-13_at_14.43.55_PM_fjtmdn.png)