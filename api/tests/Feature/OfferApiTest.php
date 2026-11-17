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
}