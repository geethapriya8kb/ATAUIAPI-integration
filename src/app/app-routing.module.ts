import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
    // {
    //     path: 'cc',
    //     loadChildren: () => import('./credit-calc/credit-calc.module').then(m => m.CreditCalcModule),
    //     pathMatch: 'prefix'
    // },

    { path: '', component: LandingPageComponent },
    {
        path: 'aos',
        loadChildren: () => import('./agent-os/agent-os.module').then(m => m.AgentOsModule),
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }