<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OfferApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_misafir_teklif_listesini_goremez(): void
    {
        $this->get('/api/offers')->assertStatus(401);
    }
    public function test_admin_giris_yapip_teklifleri_gorebilir(): void
{
    $admin = \App\Models\User::factory()->create(['password' => 'ruhi123']);
    \App\Models\Offer::create([
        'company_name' => 'ACME', 'contact_name' => 'Ali Veli',
        'email' => 'a@a.com', 'phone' => '0555555555', 'amount' => 1500,
    ]);

    $this->post('/api/login', ['email' => $admin->email, 'password' => 'ruhi123'])
        ->assertOk();

    $this->get('/api/offers')->assertOk()->assertJsonCount(1);
}

public function test_yanlis_sifre_reddedilir(): void
{
    $admin = \App\Models\User::factory()->create(['password' => 'ruhi123']);

    $this->postJson('/api/login', ['email' => $admin->email, 'password' => 'yanlis'])
        ->assertStatus(422);
}
}