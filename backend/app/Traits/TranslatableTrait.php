<?php

namespace App\Traits;

trait TranslatableTrait
{
    public function translations()
    {
        $translationModel = $this->getTranslationModel();
        return $this->hasMany($translationModel, $this->getForeignKey());
    }

    public function getTranslationModel()
    {
        $translationModel = get_class($this) . 'Lang';
        return new $translationModel;
    }

    public function getForeignKey()
    {
        return strtolower(class_basename($this)) . '_id';
    }

    public function getTranslation($attribute, $locale = null)
    {
        $locale = $locale ?? app()->getLocale();
        $translation = $this->translations()->where('locale', $locale)->first();

        return $translation ? $translation->$attribute : null;
    }

    public function setTranslation($attribute, $value, $locale = null)
    {
        $locale = $locale ?? app()->getLocale();
        $translation = $this->translations()->where('locale', $locale)->first();
        if ($translation) {
            $translation->$attribute = $value;
            $translation->save();
        } else {
            $translation = $this->getTranslationModel();
            $translation->locale = $locale;
            $translation->$attribute = $value;
            $this->translations()->save($translation);
        }
    }

    public function addTranslations($translations, $locale)
    {
        $translation = $this->translations()->where('locale', $locale)->first();

        if ($translation) {
            $translation->fill($translations);
            $translation->save();
        } else {
            $translation = $this->getTranslationModel();
            $translation->locale = $locale;
            $translation->fill($translations);
            $this->translations()->save($translation);
        }
    }

    public function translate($attribute, $locale = null)
    {
        return $this->getTranslation($attribute, $locale);
    }
}
