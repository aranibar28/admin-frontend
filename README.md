# AdminPRO

## Estructura del Proyecto

    ng g m pages --routing
    ng g m auth --routing
    ng g m shared
    

    ng g c pages/dashboard --skip-tests -is
    ng g c pages/progress --skip-tests -is
    ng g c pages/graphics --skip-tests -is
    ng g c pages/error --skip-tests -is
    ng g c pages/pages --flat --skip-tests -is

    ng g c auth/login --skip-tests -is
    ng g c auth/register --skip-tests -is

    ng g c shared/breadcrumbs --skip-tests -is
    ng g c shared/header --skip-tests -is
    ng g c shared/sidebar --skip-tests -is

    ng g m components/components --flat
    ng g c components/incrementer --skip-tests -is
